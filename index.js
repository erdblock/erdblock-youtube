/* @flow */

var fs = require("fs")
var jade = require("jade")
var is = require("is_js")
var express = require("express")

module.exports = function(){
	var app = express()

	app.locals.title = "Website"

	app.locals.configId = function(){
		return app.locals.config.url.value
	}

	app.locals.config = {
		url: {
			label: 'URL',
			value: '',
			setValue: function(v){
				this.value = v
			},
			type: 'text',
			isValid: function(value){
				if (is.not.url(value) || value.substring(0,4).toUpperCase() != "HTTP"){
					return "value is not a URL"
				}
				else{
					return null
				}
			}
		},
		title: {
			label: 'Title',
			value: '',
			setValue: function(v){
				this.value = v
			},
			type: 'text',
			isValid: function(value, calback){
				return null
			}
		},
		description: {
			label: 'Description',
			value: '',
			setValue: function(v){
				this.value = v
			},
			type: 'text',
			isValid: function(value, calback){
				return null
			}
		}
	}

	var render = jade.compileFile(__dirname + "/views/index.jade")

	app.html = function() {
		return render( app.locals )
	}

	app.less = function(){
		return fs.readFileSync(__dirname + "/stylesheets/style.less").toString()
	}

	return app
}
