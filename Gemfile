source 'https://rubygems.org'


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.1.8'
gem 'sqlite3'

gem 'sass-rails', '~> 4.0.3'
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.0.0'
gem 'therubyracer',  platforms: :ruby

gem 'jquery-rails'
gem 'jbuilder', '~> 2.0'
gem 'thin'

# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0',          group: :doc

gem 'react-rails', '~> 1.0.0.pre', github: 'reactjs/react-rails'
gem 'browserify-rails', '~>0.5'

gem "hesburgh_infrastructure", git: 'https://github.com/ndlib/hesburgh_infrastructure.git'
gem "hesburgh_api", git: 'https://github.com/ndlib/hesburgh_api.git'

group :development, :test do
  gem "pry"
  gem "rspec-rails"
  gem "rspec-collection_matchers"
  gem "capybara"
  gem "faker"
  gem 'spring'
  gem "spring-commands-rspec"

  gem 'guard', '~> 2.7.3'
  gem "guard-bundler"
  gem "guard-coffeescript"
  gem "guard-rails"
  gem "guard-rspec"
  gem "guard-spring"

  gem 'coveralls', require: false

  # Use Capistrano for deployment
  gem 'capistrano', '~> 3.1'
  gem 'capistrano-rails', '~> 1.1'
end
