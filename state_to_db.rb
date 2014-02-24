require 'csv'
require './app.rb'

csv_text = File.read('state_lat_lon.csv')
csv = CSV.parse(csv_text, :headers => true)
csv.each do |row|
  State.create!(row.to_hash)
end