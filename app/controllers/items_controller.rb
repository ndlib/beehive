class ItemsController < ApplicationController
  before_action :items_api_base
  after_action :allow_iframe, only: :embed

  def index
    @items_url = items_api_base
  end

  def embed
    @items_url = items_api_base + params[:id]
    respond_to do |format|
      format.html {render :layout => 'embed'}
    end
  end

  def show
    @items_url = items_api_base + params[:id]
  end

  private

  def items_api_base
    Rails.configuration.beehive_url + "/v1/items/"
  end

  def allow_iframe
    response.headers.except! 'X-Frame-Options'
  end

end
