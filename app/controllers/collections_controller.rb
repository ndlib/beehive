class CollectionsController < ApplicationController
  after_action :allow_iframe, only: :embed

  def index
    @collections_url = collections_api_base
  end

  def embed
    @collections_url =  collections_api_base + "/" + params[:id] + "/showcases"
    respond_to do |format|
      format.html {render :layout => "embed"}
    end
  end

  def show
    @collections_url =  collections_api_base + "/" + params[:id] + "/showcases"
  end

  private

  def collections_api_base
    Rails.configuration.honeycomb_url + "/v1/collections"
  end

  def allow_iframe
    response.headers.except! "X-Frame-Options"
  end
end
