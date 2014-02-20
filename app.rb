require 'sinatra'
require 'sinatra/base'
require 'sinatra/json'
require 'json'
require 'sinatra/activerecord'
require './environment'
require 'sinatra/flash'
require 'sinatra/redirect_with_flash'
require 'date'
require 'time'

enable :sessions

class Tornado < ActiveRecord::Base

end

helpers do

  include Rack::Utils
  alias_method :h, :escape_html

  def title
    if @title
      "#{@title}"
    else
      "Welcome."
    end
  end

end # /helpers

# API Structure
#############
# URL               Method    Operation
# /api/tornados        GET         Get an array of all books
# /api/tornados/:id   GET        Get the book with id of :id
# /api/tornados        POST       Add a new book and return the book with an id attribute added
# /api/tornados/:id   PUT         Update the book with id of :id
# /api/tornados/:id  DELETE     Delete the book with id of :id

#############
# API
#############

get "/api/tornados" do
  @tornados = Tornado.limit('500').order("yr desc").to_json
end

get '/api/state' do
  states = Tornado.select(:st).order('st asc').uniq

  states.to_json
  end

get "/api/state/:state" do
  state = params[:state]
  @tornados = Tornado.where(:st => state)
  @tornados.to_json
end

get "/api/tornados/:id" do
  @tornado = Tornado.find(params[:id]).to_json
end

post "/api/tornados" do
  content_type :json
  params_json = JSON.parse(request.body.read)

  @tornado = Tornado.new(params_json)

  if @tornado.save
    @tornado.to_json
    puts "OK \n Tornado: \n #{@tornado.to_json}"
  else
    {:error => "Nok"}.to_json
    puts "NOkay \n #{@tornado.to_json}"
  end

end

put '/api/tornados/:id' do
  # edit stuff
  # @tornado = Tornado.find(params[:id])
  # @tornado.update(params[:tornado])
  # redirect "/tornados/#{@tornado.id}"
end

delete '/api/tornados/:id' do
  content_type :json
  @tornado = Tornado.find(params[:id])

  if @tornado.destroy
    {:success => "ok"}.to_json
  else
    halt 500
  end
end

# create new tornado
get "/tornados/create" do
  @title = "Create tornado"
  @tornado = Tornado.new
  erb :"tornados/create"
end

post "/tornados" do
  @tornado = Tornado.new(params[:tornado])
  if @tornado.save
    redirect "tornados/#{@tornado.id}", :notice => 'Congrats! Love the new tornado. (This message will disapear in 4 seconds.)'
  else
    redirect "tornados/create", :error => 'Sometornado went wrong. Try again. (This message will disapear in 4 seconds.)'
  end
end

# get ALL tornados
get '/' do
  File.read(File.join('public', 'index.html'))
end

get '/tornado/*' do
  File.read(File.join('public', 'index.html'))
end

# edit tornado
get "/tornados/:id/edit" do
  @tornado = Tornado.find(params[:id])
  @title = "Edit Form"
  erb :"tornados/edit"
end

put "/tornados/:id" do
  @tornado = Tornado.find(params[:id])
  @tornado.update(params[:tornado])
  redirect "/tornados/#{@tornado.id}"
end