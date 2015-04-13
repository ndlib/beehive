Airbrake.configure do |config|
  config.api_key = 'a10b3fff90993cd9dd6bc2e1e790b130'
  config.host    = 'errbit.library.nd.edu'
  config.port    = 443
  config.secure  = config.port == 443
end
