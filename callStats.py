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
names[None] = "Own"

#get connected systems and put them in an array
connected = []

r = requests.get("http://{}:{}/ui/services/connections".format(ip, port), auth=("user", "video123"))

for item in r.json():
	if item['action'] == "connected":
		connected.append(item['name'])

#get stream stats

streams = []

r = requests.get("http://{}:{}/ui/services/system/stream-stats".format(ip, port), auth = ("user", "video123"))

for item in r.json()['streams-incoming-video']:
	streams.append(item)


for stream in streams:
	print names[stream['location-id']] or "self"
	for vid in stream['streams-incoming-video-status']:
		try:
			print "-", vid['source-fps'], vid['title']
		except:
			print vid['fps'], vid['title']
