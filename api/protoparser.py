from collections import namedtuple
import binascii

class ParseException(BaseException):
    pass

class WireTypes(object):
    Varint, SixtyFourBit, LengthDelimited, StartGroup, EndGroup, ThirtyTwoBit = range(6)

Key = namedtuple('Key', ['length', 'tag_number', 'wire_type'])

class Field(object):
    def __init__(self, key, value):
        self.key = key
        self.value = value
    def __getitem__(self, key):
        return self.value[key]
    def __getattr__(self, name):
        if hasattr(self.key, name):
            return getattr(self.key, name)
        else:
            return getattr(self.value, name)

class Value(object):
    def __init__(self, value): self.value = value
    is_int = False
    is_string = False
    is_message = False
    def unwrap(self): raise Exception("Implemented by subclasses")
    def __str__(self): return str(self.unwrap())

class IntValue(Value):
    is_int = True

    def unwrap(self): return self.value

class StringValue(Value):
    is_string = True
    def unwrap(self): return self.value.decode("utf-8")

class MessageValue(Value):
    is_message = True
    def unwrap(self): return self.value
    def __str__(self): return binascii.hexlify(self.value)
    def pretty_print(self, level=0):
        spacing = " " * 2 * level
        for child in self.children:
            toprint = "{}{}: ".format(spacing, child.key.tag_number)
            if child.value.is_int:
                toprint += str(child.value)
            elif child.value.is_string:
                toprint += '"{}"'.format(child.value)
            else:
                toprint += "{"
            print toprint
            if child.value.is_message:
                child.value.pretty_print(level + 1)                                                                                                                        
                print spacing + "}"
    def __getattr__(self, name):
        if name == "children":
            return self.get_children()
    def __getitem__(self, key):
        children = [x for x in self.get_children()
                    if x.key.tag_number == key]
        if len(children) == 0:
            return None
        elif len(children) == 1:
            return children[0]
        else:
            return children
    def get_children(self):
        def generator(data):
            offset = 0
            while offset < len(data):
                key = read_key(data[offset:])

#                print "got offset, tag, wire: ", offset, key.tag_number, wire_type
                offset += key.length
                if key.wire_type == WireTypes.Varint:
                    (varint_length, varint) = read_varint(data[offset:])
                    yield Field(key, IntValue(varint))
                    offset += varint_length
                # fixed 64 bit number
                elif key.wire_type == WireTypes.SixtyFourBit:
                    field_data = data[offset:offset + 8]
                    yield Field(key, IntValue(field_data))
                    offset += 8
                # string or embedded message
                elif key.wire_type == WireTypes.LengthDelimited:
                    # first piece of data is a varint that contains the field length
                    (varint_length, field_length) = read_varint(data[offset:])
                    # now read 'field_length' bytes after that varint to get the data
                    field_data = data[offset + varint_length : offset + varint_length + field_length]
                    # strings and messages are coded the same way, so we just
                    # have to try and fail
                    try:
                        string = field_data.decode("utf-8")
                        yield Field(key, StringValue(string))
                    except UnicodeDecodeError:
                        yield Field(key, MessageValue(field_data))
                    offset += varint_length + field_length
                # fixed 32 bits
                elif key.wire_type == WireTypes.ThirtyTwoBit:
                    field_data = data[offset:offset + 4]
                    yield Field(key, IntValue(field_data))
                    offset += 4
                else:
                    # we're going to put start/end group in here as well since
                    # it's long deprecated
                    raise ParseException("Bad wire type {}".format(key.wire_type))
        return generator(bytearray(self.value))

def is_protobuf(strdata):
    data = None
    try:
        data = bytearray(strdata)
    except Exception as e:
        print "not bytearray",
        return False
    if (not data) or (not len(data)):
        print "data has no length, ",
        return False
    # try to read the first key
    try:
        key = read_key(data)
        if key.wire_type not in [WireTypes.Varint,
                             WireTypes.SixtyFourBit,
                             WireTypes.LengthDelimited,
                             WireTypes.ThirtyTwoBit]:
            print "invalid wiretype, ",
            return False
    except ParseException as e:
        print e
        print "No valid key, first bytes:", format(data[0], '02x'), format(data[1], '02x')
        return False
    return True

def read_key(data):
    # the key contains the tag number and the wire type. tag number
    # is bit shifted 3 to the left and the wire type takes up the                                                                                                           [33/8747]
    # remaining 3 bits, then varint encoded
    (key_length, encoded_key) = read_varint(data, max_bytes=4)
    wire_type = 0x07 & encoded_key
    tag_number = encoded_key >> 3
    return Key(key_length, tag_number, wire_type)

# TODO 20/7/16: doesn't handle signed integers (sint32, sint64) because they
# are zigzag encoded
def read_varint(data, max_bytes=16):
    offset = 0
    varint = 0
    # to decode the varint, we need to reverse the array, strip the msb from
    # each byte, and concatenate
    while (data[offset] >> 7) == 1:
        if max_bytes != None and offset == max_bytes - 1:
            raise ParseException("Passed max bytes of {} while reading varint".format(max_bytes))
        varint = varint | ((0x7f & data[offset]) << (offset * 7))
        offset += 1
    varint = varint | ((0x7f & data[offset]) << (offset * 7))
    return (offset + 1, varint)

def from_raw_data(raw_data):
    if not is_protobuf(raw_data):
        return None
    return MessageValue(raw_data)
