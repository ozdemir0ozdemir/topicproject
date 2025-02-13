package ozdemir0ozdemir.topicproject;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import ozdemir0ozdemir.topicproject.domain.TopicManager;
import ozdemir0ozdemir.topicproject.domain.TopicTitleDto;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class ExampleDataCreator {

	@Bean
	CommandLineRunner runner(TopicManager topics) {
		return args -> {
			TopicTitleDto firstTitle = topics.saveTitle("10 şubat 2025 topicproject\'in başlaması");

			topics.saveDefinition(
					firstTitle.id(), "Yeni bir başlangıcın ilk adımları olabilir. Belki iyi bir şey olur! swh");


			List<TopicTitleDto> titles = new ArrayList<>();
			titles.add(topics.saveTitle("Lorem ipsum dolor sit amet"));
			titles.add(topics.saveTitle("consectetur adipiscing elit"));
			titles.add(topics.saveTitle("Etiam tincidunt eleifend neque"));
			titles.add(topics.saveTitle("Nam non tellus lacus"));
			titles.add(topics.saveTitle("Sed massa eros"));
			titles.add(topics.saveTitle("luctus nec sodales a"));
			titles.add(topics.saveTitle("lacinia sit amet nibh"));
			titles.add(topics.saveTitle("Nunc elementum mauris scelerisque"));
			titles.add(topics.saveTitle("Nunc elementum mauris scelerisque"));
			titles.add(topics.saveTitle("convallis nunc vitae"));
			titles.add(topics.saveTitle("scelerisque nunc"));
			titles.add(topics.saveTitle("Pellentesque cursus efficitur risus"));
			titles.add(topics.saveTitle("non ullamcorper mauris eleifend a"));
			titles.add(topics.saveTitle("Integer consequat sapien a rutrum consequat"));
			titles.add(topics.saveTitle("Morbi non erat dolor"));
			titles.add(topics.saveTitle("Nam sagittis facilisis quam"));
			titles.add(topics.saveTitle("in placerat odio"));
			titles.add(topics.saveTitle("Sed eget sapien id ligula auctor suscipit at laoreet erat"));
			titles.add(topics.saveTitle("Nam at mauris molestie ante gravida imperdiet"));
			titles.add(topics.saveTitle("Sed nunc lectus"));
			titles.add(topics.saveTitle("aliquet ac tincidunt a"));
			titles.add(topics.saveTitle("ullamcorper non nibh"));
			titles.add(topics.saveTitle("Quisque vulputate suscipit malesuada"));
			titles.add(topics.saveTitle("Suspendisse pharetra erat enim"));
			titles.add(topics.saveTitle("quis ultricies purus viverra id"));
			titles.add(topics.saveTitle("Duis scelerisque laoreet felis et rhoncus"));
			titles.add(topics.saveTitle("Praesent consequat libero leo"));
			titles.add(topics.saveTitle("maximus porta velit dapibus eget"));
			titles.add(topics.saveTitle("Curabitur congue erat odio"));
			titles.add(topics.saveTitle("at mollis neque ultricies nec"));
			titles.add(topics.saveTitle("Sed id malesuada justo"));
			titles.add(topics.saveTitle("In a dapibus justo"));
			titles.add(topics.saveTitle("In sagittis eros in quam pellentesque mollis"));


			titles.forEach(title -> {
					topics.saveDefinition(
							title.id(),
							"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tincidunt eleifend neque. Nam non tellus lacus. Sed massa eros, luctus nec sodales a, lacinia sit amet nibh. Nunc elementum mauris scelerisque, convallis nunc vitae, scelerisque nunc. Pellentesque cursus efficitur risus, non ullamcorper mauris eleifend a. Integer consequat sapien a rutrum consequat. Morbi non erat dolor. Nam sagittis facilisis quam, in placerat odio. Sed eget sapien id ligula auctor suscipit at laoreet erat. Nam at mauris molestie ante gravida imperdiet."
					);

					topics.saveDefinition(
							title.id(),
							"Sed nunc lectus, aliquet ac tincidunt a, ullamcorper non nibh. Quisque vulputate suscipit malesuada. Suspendisse pharetra erat enim, quis ultricies purus viverra id. Duis scelerisque laoreet felis et rhoncus. Praesent consequat libero leo, maximus porta velit dapibus eget. Curabitur congue erat odio, at mollis neque ultricies nec. Sed id malesuada justo. In a dapibus justo. In sagittis eros in quam pellentesque mollis."
					);

				topics.saveDefinition(
						title.id(),
						"Morbi tempus mauris a erat consectetur viverra eget non risus. Morbi pellentesque nunc nec enim tempus interdum. Suspendisse sit amet egestas odio. Morbi ipsum felis, tristique quis scelerisque ac, tempus vel ligula. Donec commodo tortor eu pretium pretium. In hac habitasse platea dictumst. Vivamus ex nisl, feugiat et quam a, fringilla sollicitudin orci. Nullam et sollicitudin risus, laoreet scelerisque nisl. Vivamus id risus mattis, malesuada augue id, feugiat lectus. Phasellus aliquam dolor faucibus, ultricies risus quis, varius velit. Proin aliquet felis eget rutrum euismod."
				);

				topics.saveDefinition(
						title.id(),
						"Aliquam sem mi, tempor vitae purus vel, mattis malesuada lorem. Morbi ac erat sed elit venenatis ornare. Donec nulla leo, interdum sed molestie ac, malesuada ut purus. Quisque condimentum est risus, ac imperdiet nisi lobortis quis. Integer vel dui vel ligula semper convallis. Nulla vel sem tortor. Donec sit amet metus quam. Maecenas cursus lectus in eleifend facilisis. Etiam bibendum, risus nec blandit mollis, nulla felis condimentum sapien, et malesuada ligula magna vel ligula. Vestibulum ante tellus, condimentum id varius eu, venenatis sed eros. Mauris sollicitudin nisi eu tellus aliquet bibendum."
				);

				topics.saveDefinition(
						title.id(),
						"Praesent dapibus mattis dapibus. Phasellus ut dolor sed enim tempus sodales. In ipsum leo, rutrum vel pretium vitae, lobortis gravida lacus. Nulla at tristique mauris. Vivamus condimentum, ligula nec malesuada congue, magna libero vehicula libero, vitae ornare erat nisl sit amet lorem. Praesent cursus erat ac venenatis placerat. Phasellus at imperdiet turpis, quis sagittis nulla. Etiam luctus, enim vitae porta egestas, enim lorem auctor est, eget eleifend erat mi ac lacus. Nunc et suscipit mauris. Mauris mollis, mi id ultrices semper, ex sem fringilla ligula, at efficitur lorem nunc eu sem. Sed pulvinar varius lacinia."
				);

				topics.saveDefinition(
						title.id(),
						"Vivamus commodo vulputate eros et pellentesque. Sed sodales ac quam ac egestas. Maecenas eleifend posuere est, sit amet maximus dolor hendrerit nec. Phasellus lacinia neque id sollicitudin imperdiet. Donec consequat nibh diam, dapibus scelerisque eros iaculis a. Fusce et faucibus nunc. Sed eget diam velit."
				);

				topics.saveDefinition(
						title.id(),
						"Etiam fringilla tristique rutrum. Etiam luctus ligula quis libero consectetur, at lobortis nisl faucibus. Nunc vel nunc mi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin vel sapien in nunc blandit gravida. Curabitur tortor orci, porta id condimentum at, malesuada ut neque. Nam porta placerat lorem. Quisque ornare enim nunc, in finibus felis vestibulum id. Suspendisse non aliquet ligula. Curabitur viverra suscipit neque sit amet vulputate. Suspendisse placerat fermentum facilisis. In varius, risus quis pretium suscipit, leo erat eleifend diam, ut pharetra ligula quam in leo."
				);

				topics.saveDefinition(
						title.id(),
						"Etiam dignissim libero sit amet nibh rutrum dictum. Integer neque nibh, viverra ac tincidunt vel, fringilla nec quam. Etiam magna tellus, pulvinar consectetur urna id, vulputate varius diam. Nam mi mauris, maximus eu erat eu, maximus tempus massa. Nam quis blandit augue, eu vehicula sem. Quisque nunc eros, dignissim quis blandit ut, maximus at tortor. Nullam tincidunt dui at nisl consequat, in semper metus posuere. Phasellus at metus pulvinar, dignissim tortor hendrerit, mollis tellus. Aenean tincidunt imperdiet pulvinar. Pellentesque feugiat erat eu placerat euismod. Proin augue est, finibus sed dapibus vitae, placerat eget sem. Donec gravida eleifend tellus sed accumsan."
				);

				topics.saveDefinition(
						title.id(),
						"Ut nec risus tincidunt orci porttitor dapibus. Morbi sed imperdiet leo. Nullam et mi dui. Morbi viverra eros hendrerit ex hendrerit, et dignissim ipsum sagittis. Fusce eu tortor egestas, efficitur enim ac, egestas ex. Nullam mi ipsum, pulvinar at tincidunt at, pharetra sed nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae sodales leo. Integer imperdiet lobortis libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed viverra metus, in fringilla ante. Curabitur bibendum odio ut semper sagittis. Phasellus ullamcorper ante ac massa laoreet hendrerit. Nunc sit amet enim elit. Ut ultricies sollicitudin pharetra. Curabitur ornare mi eget cursus maximus."
				);

				topics.saveDefinition(
						title.id(),
						"Mauris tincidunt rhoncus dolor et elementum. Morbi velit massa, mollis nec tortor at, mattis bibendum mi. Sed magna urna, semper et arcu quis, vehicula posuere lectus. Nullam quis feugiat purus, consectetur feugiat nibh. Cras a neque imperdiet, pretium ex eu, commodo nulla. Phasellus fringilla, nibh vitae auctor vehicula, urna turpis tristique ex, eget hendrerit magna turpis ac ipsum. Nullam eu vulputate sapien. Phasellus ac tristique dui. Suspendisse in facilisis turpis."
				);

			});
		};
	}
}
