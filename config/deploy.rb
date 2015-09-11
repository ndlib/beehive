# config valid only for current version of Capistrano
lock "3.3.5"

require "airbrake/capistrano3"
require "new_relic/recipes"

set :application, "beehive"
set :repo_url, "https://github.com/ndlib/beehive.git"

set :log_level, :info

# Default branch is set to a tag
if fetch(:stage).to_s == "production"
  set :branch, "v1.0"
else
  if ENV["SCM_BRANCH"] && !(ENV["SCM_BRANCH"] == "")
    set :branch, ENV["SCM_BRANCH"]
  else
    ask :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }.call
  end
end

# Default deploy_to directory is /var/www/my_app
set :deploy_to, "/home/app/beehive"

# Default value for :linked_files is []
# set :linked_files, %w{config/database.yml}
set :linked_files, %w{config/secrets.yml}

set :linked_dirs, %w{log tmp/pids tmp/cache tmp/sockets public/system vendor/bundle node_modules}

set :default_env, { path: "/opt/ruby/current/bin:$PATH" }

namespace :deploy do

  Rake::Task["migrate"].clear_actions
  task :migrate do ; end

  desc "Restart application"

  task :restart do
    on roles(:web), in: :sequence, wait: 5 do
      execute :touch, release_path.join("tmp/restart.txt")
    end
  end

  after :publishing, :restart

  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
    end
  end

end

after "deploy:finished", "airbrake:deploy"
after "deploy:updated", "newrelic:notice_deployment"
before "npm:install", "npm:prune"
