class AddCategoryToTornados < ActiveRecord::Migration
  def up
    add_column :posts, :category, :string
  end

  def down
  end
end
