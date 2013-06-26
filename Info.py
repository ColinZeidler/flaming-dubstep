import requests, sys, systemSort

name = sys.argv[1]

ip, port = systemSort.getAddr(name)

r = requests.get("http://{}:{}/ui/services/system/info".format(ip, port), auth=("user", "video123"))

print "<p><b>Screens:</b>", r.json()['num-screens'], "</br>"
print "<b>Cameras:</b>", r.json()['num-cams'], "</br>"
print "<b>HDShare:</b>", r.json()['hdshare-url'], "</br>"
print "<b>URL:</b>", r.json()['sip-url-public'] or r.json()['sip-url'], "</br></p>"
