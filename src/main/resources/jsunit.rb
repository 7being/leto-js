#!/usr/bin/env ruby -wKU

require "fileutils"
include FileUtils

def start_server
	rm_rf "target" if File.directory? "target"

	test_suite_page = "target/jsunit-tests/suite.html"
	server_config = {
		:Port => 8080,
		:DocumentRoot => "target/jsunit-tests"
	}

	mkdir_p "target/jsunit-tests/Leto"
	cp_r "bin/jsunit", "target/jsunit-tests"
	cp_r "src/.", "target/jsunit-tests/Leto"
	cp_r "test/.", "target/jsunit-tests/Leto"

	cd "target/jsunit-tests"
	test_pages = "\"#{Dir.glob("Leto/**/*Test.html").sort.collect{|page|"http://localhost:#{server_config[:Port]}/#{page}"}.join("\",\"")}\""
	cd("../../")
	suite = %{
		<html>
			<head>
				<title>JsUnit Test Suite</title>
				<script type="text/javascript" src="jsunit/app/jsUnitCore.js"></script>
				<script type="text/javascript" src="jsunit/app/jsUnitTestSuite.js"></script>
				<script type="text/javascript">
					function suite() { return new jsUnitTestSuite(#{test_pages}) }
				</script>
			</head>
			<body></body>
		</html>
	}

	File.open(test_suite_page, "w") { |file| file.write(suite) }

	begin
		require "win32/process"
	rescue LoadError
	end
	fork do
		require "webrick"
		server = WEBrick::HTTPServer.new(server_config)
		["INT", "TERM"].each { |signal| trap(signal) {server.shutdown} }
		server.start
		exit!
	end
#exec "rake -q build:test_server" if fork.nil?
end

def start_client
		
        # start browser to do auto test
        bin_path, bin_ext = case RUBY_PLATFORM.downcase
                   when /mswin/, /mingw/ then ["winxp", "bat"]
                   when /darwin/ then ["mac", "sh"]
                   when /linux/ then ["unix", "sh"]
                   else
                       puts "Failed: Unknown OS"
                   end
        cd "bin/jsunit/bin/#{bin_path}"
        #system "start-firefox.bat http://localhost:8080/jsunit/TestRunner.html"
        test_url = "\"http://localhost:8080/jsunit/TestRunner.html?testPage=http://localhost:8080/suite.html&autoRun=true\""
        system "start-firefox.#{bin_ext} #{test_url}"
        #wait for user to close browser
        cd "../../../"    	
end

start_server()
start_client()
