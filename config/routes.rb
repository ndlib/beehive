Rails.application.routes.draw do
  get 'collections/index'
  root to: 'collections#index'
end
