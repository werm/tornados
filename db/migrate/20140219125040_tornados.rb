class Tornados < ActiveRecord::Migration
  def change
      create_table :tornados do |t|
       t.integer :om
       t.integer :yr
       t.integer :mo
       t.integer :dy
       t.string :date
       t.string :time
       t.string :tz
       t.string :st
       t.integer :stf
       t.integer :stn
       t.integer :f
       t.integer :inj
       t.integer :fat
       t.integer :loss
       t.integer :closs
       t.string :slat
       t.string :slon
       t.string :elat
       t.string :elon
       t.integer :len
       t.integer :wid
       t.integer :ns
       t.integer :sn
       t.integer :sg
       t.integer :f1
       t.integer :f2
       t.integer :f3
       t.integer :f4
       t.timestamps
     end
  end
end
