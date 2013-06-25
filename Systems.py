import requests
from sys import argv, version
name = argv[1]
option = argv[2]

#argv[1] is the first arg 
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

no_pp = {'E':'192.168.218.202',
	'F':'192.168.217.63', 
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
if option == "system":
	s = requests.get("http://{}:{}/ui/services/locations".format(ip, port), auth=("user", "video123"))

	for system in s.json():
		print "<div id='system'>"
		print system['properties']['name']
		print "</div>"

elif option == "collab":
	c = requests.get("http://{}:{}/ui/services/resources".format(ip, port), auth=("user", "video123"))
	#con = requests.get("http://{}:{}/ui/services/connections".format(ip, port), auth=("user", "video123"))

	#names = []
	#for item in con.json():
	#	if item['action'] =='connected':
	#		names.append(item['name'])
	counter = 1
	for system in c.json():
		print "<div id='collab{0}' class=collab >".format(counter)
		print system['properties']['name'] + ":", system['properties']['type']
		#print "<div id=c{} class=panel>".format(counter)
		#for name in names:
		#	print "<div id=system>"
		#	print name
		#	print "</div>"
		#print "</div>"
		print "</div>"
		counter +=1
	
