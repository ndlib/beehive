class CollectionsController < ApplicationController
  def index
    @collection_url = exhibit_api_base
  end

  def show
    @collection_url =  params[:id]
  end

  private

    def exhibit_api_base
      Rails.configuration.beehive_url + "/v1/collections"
    end
end
