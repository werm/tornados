class AddImageToTornados < ActiveRecord::Migration
  def up
    add_column :posts, :image, :string
  end

  def down
  end
end
