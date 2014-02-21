class AddAuthorToTornados < ActiveRecord::Migration
  def up
    add_column :posts, :author, :string
  end

  def down
  end
end
