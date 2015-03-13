class SectionsController < ApplicationController
  before_action :sections_api_base
  after_action :allow_iframe, only: :embed

  def embed
    @sections_url = sections_api_base + params[:id]
    respond_to do |format|
      format.html {render :layout => 'embed'}
    end
  end

  def show
    @sections_url = sections_api_base + params[:id]
  end

  private

  def sections_api_base
    Rails.configuration.beehive_url + "/v1/sections/"
  end

  def allow_iframe
    response.headers.except! 'X-Frame-Options'
  end

end
