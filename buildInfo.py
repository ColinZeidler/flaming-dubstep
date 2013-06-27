import requests, systemSort, sys
name = sys.argv[1]

ip, port = systemSort.getAddr(name)

r = requests.get("http://{}:{}/ui/services/system/build-info".format(ip, port), auth=("user", "video123"))

print "Build:", r.json()['version'],"</br>"
print "Built:", r.json()['build_date']
