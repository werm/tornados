class States < ActiveRecord::Migration
  def change
    create_table :states do |t|
      t.string :state
      t.string :latitude
      t.string :longitude
      t.string :full_name
    end
  end
end
