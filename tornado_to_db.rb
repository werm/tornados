require 'csv'
require './app.rb'

csv_text = File.read('1950-2012_torn.csv')
csv = CSV.parse(csv_text, :headers => true)
csv.each do |row|
  Tornado.create!(row.to_hash)
end