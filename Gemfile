source "https://rubygems.org"

# Only load required mime types to save on RAM
gem "mime-types", "~> 2.6.1", require: "mime/types/columnar"

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem "rails", "~> 4.2"
gem "uglifier", ">= 1.3.0"
gem "coffee-rails", "~> 4.0.0"
gem "therubyracer",  platforms: :ruby
gem "jquery-rails", "3.1.2"
gem "jbuilder", "~> 2.0"
gem "thin"

# bundle exec rake doc:rails generates the API under doc/api.
gem "sdoc", "~> 0.4.0",          group: :doc

# React stuff
gem "react-rails"
gem "browserify-rails", "~>0.5"

gem "showdown-rails"

# For Errbit
gem "airbrake"

gem "newrelic_rpm"

# CSS
# Use SCSS for stylesheets
gem "sass-rails", "~> 4.0.3"
gem "autoprefixer-rails"

# Hesburgh Library Custom
gem "hesburgh_infrastructure", git: "https://github.com/ndlib/hesburgh_infrastructure.git"
gem "hesburgh_api", git: "https://github.com/ndlib/hesburgh_api.git"

# Use Capistrano for deployment
gem "capistrano", "~> 3.1"
gem "capistrano-rails", "~> 1.1"
gem "capistrano-npm"

group :development, :test do
  gem "rubocop", require: false

  gem "pry"
  gem "pry-coolline"
  gem "rspec-rails"
  gem "rspec-collection_matchers"
  gem "capybara"
  gem "faker"
  gem "spring"
  gem "spring-commands-rspec"

  gem "guard", "~> 2.7.3"
  gem "guard-bundler"
  gem "guard-coffeescript"
  gem "guard-npm"
  gem "guard-rails"
  gem "guard-rspec"
  gem "guard-spring"

  gem "coveralls", require: false

  gem "web-console", "~> 2.0"
end
