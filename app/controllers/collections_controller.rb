class CollectionsController < ApplicationController
  def index
    @collections_url = collections_api_base
  end

  def show
    @collections_url =  params[:id]
  end

  private

    def collections_api_base
      Rails.configuration.beehive_url + "/v1/collections"
    end
end
