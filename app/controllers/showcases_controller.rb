class ShowcasesController < ApplicationController
  before_action :showcases_api_base, except: :embed
  after_action :allow_iframe, only: :embed

  def embed
    @showcases_url =  showcases_api_base + params[:id]
    respond_to do |format|
      format.html {render :layout => 'embed'}
    end
  end

  def show
    @showcases_url =  showcases_api_base + params[:id]
  end

  private

  def showcases_api_base
    Rails.configuration.beehive_url + "/v1/showcases/"
  end

  def allow_iframe
    response.headers.except! 'X-Frame-Options'
  end

end
