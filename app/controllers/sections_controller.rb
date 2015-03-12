class SectionsController < ApplicationController
  before_action :set_collections_url
  after_action :allow_iframe, only: :embed

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

  def allow_iframe
    response.headers.except! 'X-Frame-Options'
  end

end
