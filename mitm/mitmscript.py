from httplib import HTTPConnection
from mitmproxy.script import concurrent
from mitmproxy.models import decoded

@concurrent
def response(context, flow):
    if flow.request.host.endswith("nianticlabs.com"):

        with decoded(flow.response):
            conn = HTTPConnection("127.0.0.1")
            conn.request("POST", "/api/update", flow.response.content)
            res = conn.getresponse()
            if res.status/100 not in [2, 3]:
                context.log("Got error sending mitm data to api ({})".format(res.status), level="error")

