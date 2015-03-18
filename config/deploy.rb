# config valid only for current version of Capistrano
lock '3.4.0'

set :application, 'beehive'
set :repo_url, 'https://github.com/ndlib/beehive.git'

# Default branch is :master
if fetch(:stage).to_s == 'production'
  ask :branch, 'master'
else
  ask :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }.call
end

# Default deploy_to directory is /var/www/my_app
set :deploy_to, '/home/app/beehive'

# Default value for :linked_files is []
# set :linked_files, %w{config/database.yml}
set :linked_files, %w{config/secrets.yml config/database.yml}

set :linked_dirs, %w{log tmp/pids tmp/cache tmp/sockets public/system}

set :default_env, { path: "/opt/ruby/current/bin:$PATH" }

namespace :deploy do

  desc 'Restart application'
  task :restart do
    on roles(:web), in: :sequence, wait: 5 do
      execute :touch, release_path.join('tmp/restart.txt')
    end
  end

  after :publishing, :restart

  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
    end
  end

end
