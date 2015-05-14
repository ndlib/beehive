Rails.application.routes.draw do
  root to: "collections#index"

  get "/:id/:slug", to: "collections#show"
  get "/:id/:slug/intro", to: "collections#intro"

  scope "/:collection_id/:collection_slug" do
    scope "/showcases" do
      get "/", to: "showcases#index"
      get ":id/:slug", to: "showcases#show"
    end
    scope "/sections" do
      get ":id/:slug", to: "sections#show"
    end
    scope "/items" do
      get "/", to: "items#index"
      get ":id/:slug", to: "items#show"
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

  get "/404" => "errors#not_found", via: :all

end
