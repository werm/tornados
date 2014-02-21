class AddPublishedTimeToTornados < ActiveRecord::Migration
  def up
    add_column :posts, :public, :boolean
    add_column :posts, :published_at, :datetime
  end

  def down
  end
end
