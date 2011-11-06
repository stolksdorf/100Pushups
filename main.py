import os
import urllib
import logging
import string

from google.appengine.ext import webapp
from google.appengine.ext.webapp import template
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.ext import db
from google.appengine.ext.webapp import util

from django.utils import simplejson as json

from google.appengine.api import users

class Users(db.Model):
	user = db.UserProperty(auto_current_user_add = True)
	level = db.IntegerProperty()
	dateAdded = db.DateTimeProperty(auto_now_add = True)

class Records(db.Model):
	user = db.UserProperty(auto_current_user_add = True)
	limit = db.IntegerProperty()
	passed = db.BooleanProperty()
	total = db.IntegerProperty()
	challenge = db.BooleanProperty()
	dateAdded = db.DateTimeProperty(auto_now_add = True)

class MainHandler(webapp.RequestHandler):
	def get(self):
		self.redirect("/home")

class HomePage(webapp.RequestHandler):
	def get(self):
		values={}
		self.response.out.write(template.render('homepage.html', values))
	
	
class AccountPage(webapp.RequestHandler):
	def get(self):
		values={}
		self.response.out.write(template.render('account.html', values))
	
class AboutPage(webapp.RequestHandler):
	def get(self):
		values={}
		self.response.out.write(template.render('about.html', values))
	

#Database Accessors
	
	
class GetUserData(webapp.RequestHandler):
	def get(self):
		logging.error("Getting data")
		redirect = self.request.get('redirect')
		user = users.get_current_user()
		
		#Check to see if the user exists
		if user:
			#search for the user iwthin our database
			result = Users.all().filter('user = ', users.get_current_user()).get()
			
			if result == None:
				logging.info("Creating new user")
				dataToSend = self.createNewUser(redirect, user.nickname)
			else:
				logging.info("Sending user data")
				dataToSend = self.loggedinData(redirect, result)
			
		else:
			logging.info("User not logged in")
			logging.error("CHECK IT " + redirect)
			dataToSend = self.loggedoutData(redirect)
			
		#send the data off
		self.response.out.write(json.dumps(dataToSend))
		
		
		
	def createNewUser(self, redirectTo, name ):
		newUser = Users()
		newUser.level = 0;
		newUser.startPushups = 0
		newUser.put()
		values = {	"loggedin" : True,
					"name" : name,
					"level"    : 0,
					"logoutUrl" : users.create_logout_url("/" + redirectTo)
				}
		return values
		
		
	def loggedinData(self, redirectTo, userEntry):
		values = {	"loggedin" : True,
					"name" : userEntry.user.nickname(),
					"level"    : userEntry.level,
					"logoutUrl" : users.create_logout_url("/" + redirectTo)
				}
		return values
		
	def loggedoutData(self, redirectTo):
		logging.error("Not logged in")
		values = {	"loggedin" : False,
					"loginUrl" : users.create_login_url("/" + redirectTo)
				}
		return values
		
class GetRecords(webapp.RequestHandler):
	def get(self):
	
		user = users.get_current_user()
		
		totalPushups = 0
		benchmarks = []
		challenges = []
		
		if user:
			userRecord = Users.all().filter('user = ', users.get_current_user()).get()
			results = Records.all().filter('user = ', users.get_current_user()).get()
			if results != None:
				for record in results:
					if(record.challenge):
						challenges.append(record)
					else:
						benchmarks.append(redord)
					totalPushups += record.total
					
					
				data = {"name"  	: user.nickname,
						"level"		: userRecord.level,
						"started"	: userRecord.dateAdded,
						"total"		: totalPushups,
						"benchmarks": benchmarks,
						"challenges": challenges
				}
				self.response.out.write(json.dumps(data))
			else:
				self.response.out.write("No entry for user found")
		else:
			self.response.out.write("Not Logged in")
		'''
		#retrierve all the records
		#loop through each and build an array of benchmarks and challenegs
		#add up total amount of pushups
		
		
		benchmark = {	"passed"	:
						"limit"		:
						"total"		:
						"date"		:
					}
					
		challenge = {	"limit"		:
						"date"		:
					}
		
		data = {"name"  	:
				"level"		:
				"started"	:
				"total"		:
				"benchmarks":
				"challenges":
				}
		
				Name:
		Current Level:
		Date Started:
		Total Pushups Since start:
		Challenges:
		
		Graph of Limits:
		
		Delete All data?
		
		'''
'''
class DeleteUserData(webapp.RequestHandler):
	def get(self):
'''
	
	
class SetUserLevel(webapp.RequestHandler):
	def get(self):
		newLevel = self.request.get('level')
		
		logging.info("setting new level" + newLevel)
		
		user = users.get_current_user()
		if user:
			result = Users.all().filter('user = ', users.get_current_user()).get()
			if result != None:
				if newLevel:
					result.level = int(newLevel)
				result.put()
				self.response.out.write("levelUpdated")
			else:
				self.response.out.write("No entry for user found")
		else:
			self.response.out.write("Not Logged in")
		
class AddRecord(webapp.RequestHandler):
	def get(self):	
	
		logging.info("Adding a new record")
		newRecord = Records()
		newRecord.limit = int(self.request.get('limit'))
		newRecord.total = int(self.request.get('total'))
		newRecord.passed = self.request.get('passed') == 'true'
		newRecord.challenge = self.request.get('challenge') == 'true'
		
		newRecord.put()
		
		self.response.out.write("Record Saved")

		
		
'''
	user = db.UserProperty(auto_current_user_add = True)
	limit = db.IntegerProperty()
	passed = db.BooleanProperty()
	total = db.IntegerProperty()
	challenge = db.BooleanProperty()
	dateAdded = db.DateTimeProperty(auto_now_add = True)

class SetUserData(webapp.RequestHandler):
	def get(self):
		type = self.request.get('type')
		#newLevel = self.request.get('level')
		#startPushups = self.request.get('startpushups')
		completed = self.reqest.get('completed')
		totalPushups = self.request.get('totalPushups')
		finalPushups = self.request.get('finalPushups')
		
		user = users.get_current_user()
		if user:
			result = Users.all().filter('user = ', users.get_current_user()).get()			
			if result != None:
			
				if newLevel:
					result.level = int(newLevel)
				if startPushups:
					result.startPushups = int(startPushups)
					
				result.put()
				self.response.out.write("levelUpdated")
			else:
				self.response.out.write("No entry for user found")
		else:
			self.response.out.write("Not Logged in")

'''
'''
class getAccountData(webapp.RequestHandler):
	def get(self):
		logging.error("Getting data")
		redirect = self.request.get('redirect')
		user = users.get_current_user()

		if user:
			bResults = Records.all().filter('user = ', users.get_current_user()).filter('challenge=', False).get()
			cResults = Records.all().filter('user = ', users.get_current_user()).filter('challenge=', True).get()
			
			totalPushups = 0
			
			
			for benchmark in bResults:
				
			#for each benchamrk, 
				#add a new benchmark object 
				#Increment total 
			
			

			values = {	"totalPushups" : True,
						"benchmarks"   : user.nickname(),
						"challenges"   : userLevel,
					}
		else:	
			logging.error("Not logged in")
						
		#send the data off
		self.response.out.write(json.dumps(values))
'''
def main():
	application = webapp.WSGIApplication([	('/', MainHandler),
											('/getUserData', GetUserData),
											('/setlevel', SetUserLevel),
											('/addrecord', AddRecord),
											#('/delete', DeleteUserData),
											('/records', GetRecords),
											
											
											('/home', HomePage),
											('/account', AccountPage),
											('/about', AboutPage)
										],
										 debug=True)
	util.run_wsgi_app(application)

if __name__ == '__main__':
	main()

