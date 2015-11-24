class PagesController < ApplicationController

  def show
    @page_url = collections_api_base + params[:id]
  end

  private

  def collections_api_base
    Rails.configuration.honeycomb_url + "/v1/pages/"
  end

end
