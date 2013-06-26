import requests, systemSort
from sys import argv

name = argv[1]

ip, port = systemSort.getAddr(name)
#id and name dictionary
names = {}
r = requests.get("http://{}:{}/ui/services/locations".format(ip, port), auth=("user", "video123"))
for sys in r.json():
	names[sys['id']] = sys['properties']['name']
names[None] = "Self"

#get connected systems and put them in an array
connected = []

r = requests.get("http://{}:{}/ui/services/connections".format(ip, port), auth=("user", "video123"))

for item in r.json():
	if item['action'] == "connected":
		connected.append(item['name'])

#get stream stats

streams = []

r = requests.get("http://{}:{}/ui/services/system/stream-stats".format(ip, port), auth = ("user", "video123"))
b = requests.get("http://{}:{}/ui/services/system/build-info".format(ip, port), auth = ("user", "video123"))
try:
	for item in r.json()['streams-incoming-video']:
		streams.append(item)
except:
	streams.append("")

Dcount = 0
print "<h2>System Stats</h2>"
print "<div id=buildInfo>Build: {}</br>Built: {}</div>".format(b.json()['version'], b.json()['build_date'])
print "<h3>Incoming Video</h3>"
print "<div id=statsContent>"
try:
	for stream in streams:
		print "<div id=SysStat><b>"
		Dcount += 1
		print names[stream['location-id']]
		print "</b>"
		for vid in stream['streams-incoming-video-status']:
			print "<div id=stat>"
			Dcount += 1
			print "<b>" + vid['title'] +"</b>"
			print "<p>"
			try:
				print vid['source-fps'], "FPS"
			except:
				try:
					print vid['fps'], "FPS"
				except:
					print "No FPS"
			print "</br>"
			try:
				print "{}p".format(vid['source-height'])
			except:
				print "No Height"
			print "</br>"
			#kbps
			try:
				print vid['source-kbps'], "kbps"
			except:
				print "No kbps"
			print "</p>"
			print "</div>" #end of stat
			Dcount -= 1
		print "</div>" #end of SysStat
		Dcount -= 1
except:
	for i in range(0, Dcount):
		print "</div>"
	print "<h4>No Incoming Video</h4>"
print "</div>" #end of statsContent
print "<h3>Outgoing Video</h3>"
print "<div id=outVidContent>"
#for loop over all out going streams
Dcount = 0
try:
	for item in r.json()['streams-outgoing-video']:
		print "<div id=SysStat><b>{}</b>".format(names[item['location-id']])
		Dcount += 1
		for stream in item['streams-outgoing-video-status']:
			print "<div id=stat>"
			Dcount += 1
			print "<b>{}</b>".format('Video' if stream['resource-id'] == 'video' else 'Collab')
			print "<p>{} FPS</br>{}p</p>".format(stream['fps'], stream['height'])
			print "</div>" #end of stat
			Dcount -= 1
		print "</div>" #end of SysStat
		Dcount -= 1
except:
	for i in range(0, Dcount):
		print "</div>"
	print "<h4>No Out Going Video</h4>"
print "</div>" #end of outVidContent
