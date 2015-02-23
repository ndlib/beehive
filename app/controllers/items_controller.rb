class ItemsController < ApplicationController
  before_action :set_collections_url

  def show
    @showcases_url =  @collections_url + "/showcases/" + params[:showcase_id]
    @sections_url =  @collections_url + "/sections/" + params[:section_id]
    @items_url = @collections_url + "/items/" + params[:item_id]
  end

  private

  def set_collections_url
    @collections_url = Rails.configuration.beehive_url + "/v1/collections/" + params[:collection_id]
  end

end
