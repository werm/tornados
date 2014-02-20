require 'csv'
require './app.rb'

csv_text = File.read('1950-2012_torn.csv')
csv = CSV.parse(csv_text, :headers => true)
csv.each do |row|
  Tornado.create!(row.to_hash)
end


# require 'csv'
# require './app.rb'

# CSV.parse('1950-2012_torn.csv', headers: true) do |row|
#   Tornado.create!(
#     :om => ['om'],
#     :yr => ['yr'],
#     :mo => ['mo'],
#     :dy => ['dy'],
#     :date => ['dat'],
#     :time => ['tim'],
#     :tz => ['tz'],
#     :st => ['st'],
#     :stf => ['stf'],
#     :sn => ['sn'],
#     :f => ['f'],
#     :inj => ['inj'],
#     :fat => ['fat'],
#     :loss => ['loss'],
#     :closs => ['closs'],
#     :slat => ['slat'],
#     :slon => ['slon'],
#     :elat => ['elat'],
#     :elon => ['elon'],
#     :len => ['len'],
#     :wid => ['wid'],
#     :ns => ['ns'],
#     :stn => ['stn'],
#     :sg => ['sg'],
#     :f1 => ['f1'],
#     :f2 => ['f2'],
#     :f3 => ['f3'],
#     :f4 => ['f4']
#     )
# end