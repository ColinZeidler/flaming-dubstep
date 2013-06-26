import requests, sys, systemSort

name = sys.argv[1]

ip, port = systemSort.getAddr(name)

r = requests.get("http://{}:{}/ui/services/system/info".format(ip, port), auth=("user", "video123"))

print "<p><b>Screens:</b>", r.json()['num-screens'], "</br>"
print "<b>Cameras:</b> {},".format(r.json()['num-cams']),"<b>Normal:</b> {},".format(r.json()['num-norm-cams']), "<b>Aux:</b>", r.json()['num-aux-cams'], "</br>"
print "<b>HDShare:</b>", r.json()['hdshare-url'], "</br>"
print "<b>URL:</b>", r.json()['sip-url-public'] or r.json()['sip-url'], "</br></p>"
