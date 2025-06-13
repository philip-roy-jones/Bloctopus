local jwt_payload_header = {
  VERSION = "1.0.0",
  PRIORITY = 900,
}

function jwt_payload_header.access(conf)
  local auth_header = ngx.req.get_headers()["Authorization"]
  if not auth_header then return end

  local token = auth_header:match("Bearer%s+(.+)")
  if not token then return end

  local segments = {}
  for segment in token:gmatch("[^%.]+") do
    table.insert(segments, segment)
  end
  if #segments ~= 3 then return end

  local payload_b64 = segments[2]
  local mod = #payload_b64 % 4
  if mod > 0 then
    payload_b64 = payload_b64 .. string.rep("=", 4 - mod)
  end

  local payload_json = ngx.decode_base64(payload_b64)
  if not payload_json then return end

  ngx.req.set_header("x-jwt-payload", payload_json)
end

return jwt_payload_header
