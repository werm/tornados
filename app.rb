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

class Tornado < ActiveRecord::Base

end

class State < ActiveRecord::Base

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
  @tornados = Tornado.limit('1000').order("yr desc").to_json
end

get "/api/year/:year" do
  content_type :json
  year = params[:year]
  @year = Tornado.where(:yr => year)
  @year.to_json
end

get '/api/state' do
  @states = State.all
  @states.to_json
end

get "/api/state/:state" do
  content_type :json
  state = params[:state]
  @state = State.where(:state => state)
  @state.to_json
end

get "/api/state_tornado/:state" do
  state = params[:state]
  @tornados = Tornado.where(:st => state)
  @tornados.to_json
end

get "/api/tornados/:id" do
  @tornado = Tornado.find(params[:id]).to_json
end

put '/api/tornados/:id' do
  # edit stuff
  # @tornado = Tornado.find(params[:id])
  # @tornado.update(params[:tornado])
  # redirect "/tornados/#{@tornado.id}"
end

# get ALL tornados
get '/' do
  File.read(File.join('public', 'app.html'))
end

get '/year/*' do
  File.read(File.join('public', 'app.html'))
end

get '/tornado/*' do
  File.read(File.join('public', 'app.html'))
end
