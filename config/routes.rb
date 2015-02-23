Rails.application.routes.draw do
  get '/', to: 'collections#index'
  resources :items, path: '/:collection_id/*slug/showcases/:showcase_id/*slug/sections/:section_id/*slug/items/:item_id/*slug', action: 'show'
  resources :sections, path: '/:collection_id/*slug/showcases/:showcase_id/*slug/sections/:section_id/*slug', action: 'show'
  resources :showcases, path: '/:collection_id/*slug/showcases/:showcase_id/*slug', action: 'show'
  resources :collections, path:  '/:id/*slug', action: 'show'

  root to: 'collections#index'
end
