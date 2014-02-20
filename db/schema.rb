# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140219125040) do

  create_table "tornados", force: true do |t|
    t.integer  "om"
    t.integer  "yr"
    t.integer  "mo"
    t.integer  "dy"
    t.string   "date"
    t.string   "time"
    t.string   "tz"
    t.string   "st"
    t.integer  "stf"
    t.integer  "stn"
    t.integer  "f"
    t.integer  "inj"
    t.integer  "fat"
    t.integer  "loss"
    t.integer  "closs"
    t.string   "slat"
    t.string   "slon"
    t.string   "elat"
    t.string   "elon"
    t.integer  "len"
    t.integer  "wid"
    t.integer  "ns"
    t.integer  "sn"
    t.integer  "sg"
    t.integer  "f1"
    t.integer  "f2"
    t.integer  "f3"
    t.integer  "f4"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
