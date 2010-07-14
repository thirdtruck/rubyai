require 'highline/import'

class InteractiveInterface
	def puts(string)
		Kernel.print(string)
		ask(''){ |q| q.echo = '' }
		Kernel.puts()
	end
	def gets(query)
		query = query + " " if query !~ /\s$/
		answer = ask(query) { |q| q.echo = true }
		Kernel.puts()
		answer
	end
end
