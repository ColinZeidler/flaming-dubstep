#purpose: to provide a single call to get the ip and port of a system by Name
def getAddr(name):
	import json
	jfile = open('systems.json', 'r') #reads the json file storing all systems and passports
	jsonList = json.loads(jfile.read()) #parses the json into something useable

	system = jsonList['Systems'][name]
	if system['passport'] == 'None': #get either the passport ip or system ip
		ip = system['ip']
	else:
		ip = jsonList['Passports'][system['passport']]['ip']

	port = system['port']	#gets the port
	print ip, port
