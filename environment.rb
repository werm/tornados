# configure :development do
#  set :database, 'sqlite:///dev.db'
#  set :show_exceptions, true
# end
#
configure :development do
   db = URI.parse(ENV['DATABASE_URL'] || 'mysql://localhost:3306/ruby_cms')

 ActiveRecord::Base.establish_connection(
   :adapter  => 'mysql2',
   :host     => db.host,
   :username => db.user,
   :password => db.password,
   :database => db.path[1..-1],
   :encoding => 'utf8'
 )
end

configure :production do
 db = URI.parse(ENV['DATABASE_URL'] || 'mysql:///localhost/ruby_cms')

 ActiveRecord::Base.establish_connection(
   :adapter  => db.scheme == 'mysql2' ? 'mysql2' : db.scheme,
   :host     => db.host,
   :username => db.user,
   :password => db.password,
   :database => db.path[1..-1],
   :encoding => 'utf8'
 )
end