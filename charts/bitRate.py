import requests, sys
sys.path.insert(0, '/var/www/NewControl')
import systemSort

ip, port = systemSort.getAddr(sys.argv[1])

names = {}
r = requests.get("http://{}:{}/ui/services/locations".format(ip, port), auth=("user", "video123"))
for sys in r.json():
	names[sys['id']] = sys['properties']['name']
names[None] = "Self"

r = requests.get("http://{}:{}/ui/services/system/stream-stats".format(ip, port), auth=("user", "video123"))

totalIn = 0
totalOut = 0

for stream in r.json()['streams-incoming-video']:
    if "Self" != names[stream['location-id']]:
        for vid in stream['streams-incoming-video-status']:
            totalIn += int(vid['source-kbps'])

for item in r.json()['streams-outgoing-video']:
    if "Self" != names[item['location-id']]:
        for stream in item['streams-outgoing-video-status']:
            totalOut += int(stream['kbps'])

print totalIn, totalOut
