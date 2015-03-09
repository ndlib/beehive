class SectionsController < ApplicationController
  before_action :set_collections_url

  def embed
    @sections_url = "#{@collections_url}/sections/#{params[:id]}"
    respond_to do |format|
      format.html {render :layout => 'embed'}
    end
  end

  def show
    @sections_url = "#{@collections_url}/sections/#{params[:id]}"
  end

  private

  def set_collections_url
    @collections_url = Rails.configuration.beehive_url + "/v1/collections/" + params[:collection_id]
  end

end
