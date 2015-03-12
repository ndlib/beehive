Rails.application.routes.draw do
  root to: 'collections#index'

  get '/:id/:slug', to: 'collections#show'

  scope '/:collection_id/:collection_slug' do
    scope '/showcases' do
      get ':id/:slug', to: 'showcases#show'
    end
    scope '/sections' do
      get ':id/:slug', to: 'sections#show'
    end
    scope '/items' do
      get '/', to: 'items#index'
      get ':id/:slug', to: 'items#show'
    end
  end

  scope '/embed' do
    get '/:id/:slug', to: 'collections#embed'
    scope '/:collection_id/:collection_slug' do
      scope '/showcases' do
        get ':id/:slug', to: 'showcases#embed'
      end
      scope '/sections' do
        get ':id/:slug', to: 'sections#embed'
      end
      scope '/items' do
        get ':id/:slug', to: 'items#embed'
      end
    end

  end


end
