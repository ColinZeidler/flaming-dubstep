import requests
from sys import argv

name = argv[1]

systems = {'Avocado':'A', 
        'Banana':'B', 
        'Coconut':'C', 
        'Duku':'D',
        'Emblic':'E',
        'Fig':'F', 
        'Galia':'G', 
        'Honeydew':'H', 
        'Imbe':'I',
        'Jalapeno':'J',
        'Kiwi':'K',
        'Loganberry':'L',
        'Newton':'N', 
        'Papaya':'P'}
behind_m = {'A':0, 'B':1, 'C':2, 'D':3}
behind_p = {'G':0, 'H':1, 'I':2}
behind_r = {'P':0}
behind_pass = ['A', 'B', 'C', 'D', 'G', 'H', 'I', 'P']

no_pp = {'F':'192.168.217.63', 
        'K':'192.168.218.191',
        'L':'192.168.218.192',
        'N':'192.168.218.190',
        'J':'192.168.218.204'}

port = 80

short_name = systems[name]
if short_name in behind_pass:
        port = 64100
        if short_name in behind_m:
                ip = '192.168.218.124'
                port += behind_m[short_name]
        elif short_name in behind_p:
                ip = '192.168.218.123'
                port += behind_p[short_name]
        elif short_name in behind_r:
                ip = '192.168.218.128'
                port += behind_r[short_name]
else:
        ip = no_pp[short_name]

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

for item in r.json()['streams-incoming-video']:
	streams.append(item)

print "<h2>System Stats</h2>"
print "<div id=buildInfo>Build: {}</br>Built: {}</div>".format(b.json()['version'], b.json()['build_date'])
print "<h3>Incoming Video</h3>"
print "<div id=statsContent>"
for stream in streams:
	print "<div id=SysStat><b>"
	print names[stream['location-id']]
	print "</b>"
	for vid in stream['streams-incoming-video-status']:
		print "<div id=stat>"
		print "<b>" + vid['title'] +"</b>"
		print "<p>"
		try:
			print vid['source-fps'], "FPS"
		except:
			print vid['fps'], "FPS"
		try:
			print "</br>{}p".format(vid['source-height'])
		except:
			pass
		print "</p>"
		print "</div>" #end of stat
	print "</div>" #end of SysStat
print "</div>" #end of statsContent
print "<h3>Outgoing Video</h3>"
print "<div id=outVidContent>"
#for loop over all out going streams
for item in r.json()['streams-outgoing-video']:
	print "<div id=SysStat><b>{}</b>".format(names[item['location-id']])
	for stream in item['streams-outgoing-video-status']:
		print "<div id=stat>"
		print "<b>{}</b>".format('Video' if stream['resource-id'] == 'video' else 'Collab')
		print "<p>{} FPS</br>{}p</p>".format(stream['fps'], stream['height'])
		print "</div>" #end of stat
	print "</div>" #end of SysStat
print "</div>" #end of outVidContent
