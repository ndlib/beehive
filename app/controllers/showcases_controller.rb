class ShowcasesController < ApplicationController
  before_action :set_collections_url

  def show
    @showcases_url =  @collections_url + "/showcases/" + params[:id]
  end

  private

  def set_collections_url
    @collections_url = Rails.configuration.beehive_url + "/v1/collections/" + params[:collection_id]
  end

end
