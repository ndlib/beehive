Rails.application.routes.draw do
  root to: "collections#index"

  get "/404" => "errors#not_found", via: :all

  get "/:id", to: "collections#show"
  get "/:id/:slug", to: "collections#show"
  get "/:id/:slug/intro", to: "collections#intro"


  scope "/:collection_id/:collection_slug" do
    scope "/showcases" do
      get "/", to: "showcases#index"
      get ":id/", to: "showcases#show"
      get ":id/:slug", to: "showcases#show"
    end
    scope "/items" do
      get "/", to: "items#index"
    end
  end

  scope "/:collection_id" do
    scope "/showcases" do
      get "/", to: "showcases#index"
      get ":id/", to: "showcases#show"
      get ":id/:slug", to: "showcases#show"
    end
    scope "/items" do
      get "/", to: "items#index"
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
