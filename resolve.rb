require 'digest'

require_match = /.*(require\((?:'|")(.*)(?:'|")\))/

content_cache = {}
resolution_order = []

def collapse_imports(order, imports)
  output = []

  order.each do |path|
    hash = Digest::MD5.hexdigest(path)
    output.push("var _v_#{hash} = #{imports[path]}\n")
  end

  output.to_s
end

process_file = Proc.new do |path|
  output = []

  File.new(path, 'r').each do |line|
    match = line.match(require_match)

    if match
      import_path = match.captures[1]

      hash = Digest::MD5.hexdigest(import_path)

      if not content_cache.has_key?(import_path)
        content = process_file.call(import_path)

        content_cache[import_path] = content
        resolution_order.push(import_path)
      end


      output.push(line.gsub(
        match.captures[0],
        '_v_' + hash
      ))
    else
      output.push(line)
    end
  end

  output.join("")
end

result = process_file.call(ARGV[0])
puts collapse_imports(resolution_order, content_cache)
puts result