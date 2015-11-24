Rails.application.routes.draw do
  root to: "collections#index"

  scope "/theme" do
    get "/test", to: "collections#theme"
  end

  get "/404" => "errors#not_found", via: :all

  get "/:id", to: "collections#show"
  get "/:id/intro", to: "collections#intro"
  get "/:id/about", to: "collections#about"
  get "/:id/:slug", to: "collections#show"
  get "/:id/:slug/intro", to: "collections#intro"
  get "/:id/:slug/about", to: "collections#about"

  scope "/:collection_id/:collection_slug" do
    scope "/showcases" do
      get ":id/", to: "showcases#show"
      get ":id/:slug", to: "showcases#show"
    end
    scope "/items" do
      get "/", to: "items#search"
    end
    scope "/search" do
      get "/", to: "items#search"
    end
    scope "/pages" do
      get ":id", to: "pages#show"
      get ":id/:slug", to: "pages#show"
    end
  end

  scope "/:collection_id" do
    scope "/showcases" do
      get "/", to: "showcases#index"
      get ":id/", to: "showcases#show"
      get ":id/:slug", to: "showcases#show"
    end
    scope "/items" do
      get "/", to: "items#search"
    end
    scope "/search" do
      get "/", to: "items#search"
    end
    scope "/pages" do
      get ":id", to: "pages#show"
      get ":id/:slug", to: "pages#show"
    end
  end

  scope "/embed" do
    get "/:id/", to: "collections#embed"
    scope "/showcases" do
      get ":id/", to: "showcases#embed"
    end
    scope "/sections" do
      get ":id/", to: "sections#embed"
    end
    scope "/items" do
      get ":id/", to: "items#embed"
    end
  end

  resources :styleguide
end
